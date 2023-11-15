import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { insert, update, remove, getPage } from "../http/contactApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const ContactModal = observer(({ show, onHide }) => {
  const { contact } = useContext(Context);
  var status = contact.Id === null;

  const crud = async () => {
    var oper = contact.Oper;
    switch (oper) {
      case "u":
        update(contact);
        break;
      case "c":
        insert(contact);
        break;
      case "d":
        remove(contact);
        break;
      default:
        break;
    }
    onHide();
    contact.setData(await getPage(contact.PageNumber));
    setTimeout(window.location.reload(true), 1500);
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {status ? "Add new contact" : "Contact"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label
            className="mx-1 mt-1"
            style={{ color: contact.Name === "" ? "red" : "black" }}
          >
            Name
          </Form.Label>
          <Form.Control
            value={contact.Name}
            onChange={e => contact.setName(e.target.value)}
            placeholder={"Name"}
          />

          <Form.Label
            className="mx-1 mt-2"
            style={{ color: contact.MobilePhone === "" ? "red" : "black" }}
          >
            Mobile phone
          </Form.Label>
          <Form.Control
            value={contact.MobilePhone}
            onChange={(e) => contact.setMobilePhone(e.target.value)}
            placeholder={"Mobile phone"}
          />

          <Form.Label
            className="mx-1 mt-2"
            style={{ color: contact.JobTitle === "" ? "red" : "black" }}
          >
            Job title
          </Form.Label>
          <Form.Control
            value={contact.JobTitle}
            onChange={(e) => contact.setJobTitle(e.target.value)}
            placeholder={"Job title"}
          />

          <Form.Label
            className="mx-1 mt-2"
            style={{ color: contact.BirthDate === "" ? "red" : "black" }}
          >
            Birth Date
          </Form.Label>
          <Form.Control
            type="date"
            value={contact.BirthDate}
            onChange={(e) => {
              contact.setBirthDate(e.target.value);
            }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {!status ? (
          <Button
            variant="outline-success"
            onClick={() => {
              if (contact.Name === "") {
                return;
              }
              contact.setOper("u");
              crud();
            }}
          >
            Update
          </Button>
        ) : null}
        <Button
          variant={status ? "outline-success" : "outline-danger"}
          onClick={() => {
            if (contact.Name === "") {
              return;
            }
            contact.setOper(status ? "c" : "d");
            crud();
          }}
        >
          {status ? "Add" : "Delete"}
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ContactModal;
