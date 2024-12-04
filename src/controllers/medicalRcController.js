/******************* Get all medical reports *******************/
const getAllRecords = async () => {
  const res = await fetch("/7800/MedicalRecords/");

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

/******************* Get record by id *******************/
const getRecordById = async (_id) => {
  const res = await fetch(`/7800/MedicalRecords/${_id}`);

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

export { getAllRecords, getRecordById };
