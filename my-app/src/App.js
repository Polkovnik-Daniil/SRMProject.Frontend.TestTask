import "./App.css";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "./index.js";
import { getPage } from "./http/contactApi.jsx";
import MaterialReactTable from "material-react-table";
import ContactModal from "./modals/ContactModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const columns = [
  {
    accessorKey: "id",
    header: "Id",
    enableHiding: false,
    columnVisibility: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobilePhone",
    header: "Mobile phone",
  },
  {
    accessorKey: "jobTitle",
    header: "Job title",
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
  },
];

const App = observer(() => {
  const { contact } = useContext(Context);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 100, //customize the default page size
  });
  const [modalVisible, setModalVisible] = useState(false);
  const GetValues = async (pageIndex) => {
    contact.setData(await getPage(pageIndex));
    console.log("GetValues");
    console.log(contact.Data);
    setPagination({ pageIndex: contact.Data.countPage, pageSize: 100 });
  };
  useEffect(() => {
    if (!modalVisible) {
      GetValues(pagination.pageIndex);
    }
  }, []);
  var data = contact.Data.page;
  if (data === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div className="d-flex flex-column">
      <div class="text-center">
        <h1 class="display-1 fw-bold text-black">Contacts</h1>
      </div>
      <MaterialReactTable
        columns={columns}
        data={data}
        onPaginationChange={setPagination}
        initialState={{ columnVisibility: { id: false } }}
        muiTableBodyCellProps={({ cell }) => ({
          onClick: (event) => {
            contact.setId(contact.Data.page[cell.row.index].id);
            contact.setName(cell.row._valuesCache.name);
            contact.setMobilePhone(cell.row._valuesCache.mobilePhone);
            contact.setJobTitle(cell.row._valuesCache.jobTitle);
            contact.setBirthDate(cell.row._valuesCache.birthDate.split("T")[0]);
            setModalVisible(true);
          },
        })}
      />
      <ContactModal show={modalVisible} onHide={() => setModalVisible(false)} />
      <button
        type="button"
        class="btn btn-primary align-self-end m-3"
        onClick={() => {
          setModalVisible(true);
          contact.setClean();
        }}
      >
        Add new contact
      </button>
    </div>
  );
});

export default App;
