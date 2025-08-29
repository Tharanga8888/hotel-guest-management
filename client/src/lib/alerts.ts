import Swal from "sweetalert2";

export const alertAdd = () => {
  Swal.fire({
    icon: "success",
    title: "Guest added",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertUpdate = () => {
  Swal.fire({
    icon: "success",
    title: "Guest updated",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const alertDelete = () => {
  Swal.fire({
    icon: "success",
    title: "Guest deleted",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const confirmDelete = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Delete this guest?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });
  return result.isConfirmed;
};
