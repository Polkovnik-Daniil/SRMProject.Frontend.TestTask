import { makeAutoObservable } from "mobx";

export default class ContactStore {
  constructor() {
    this._data = [];
    this._pageNumber = 1;
    this._oper = null;
    this._id = null;
    this._name = null;
    this._mobilePhone = null;
    this._jobTitle = null;
    this._birthDate = null;
    makeAutoObservable(this);
  }
  setId(value) {
    this._id = value;
  }
  setName(value) {
    this._name = value;
  }
  setData(value) {
    this._data = value;
  }
  setOper(value) {
    this._oper = value;
  } 
  setPageNumber(value) {
    this._pageNumber = value;
  }
  setMobilePhone(value) {
    this._mobilePhone = value;
  }
  setJobTitle(value) {
    this._jobTitle = value;
  }
  setBirthDate(value) {
    this._birthDate = value;
  }
  setClean() {
    this._oper = null;
    this._id = null;
    this._name = null;
    this._mobilePhone = null;
    this._jobTitle = null;
    this._birthDate = null;
  }
  get Id() {
    return this._id;
  }
  get Data() {
    try {
      return this._data;
    } catch (e) {
      console.log(e);
    }
  }
  get Oper() {
    return this._oper;
  }
  get PageNumber() {
    return this._pageNumber;
  }
  get Name() {
    return this._name;
  }
  get MobilePhone() {
    return this._mobilePhone;
  }
  get JobTitle() {
    return this._jobTitle;
  }
  get BirthDate() {
    return this._birthDate;
  }
}
