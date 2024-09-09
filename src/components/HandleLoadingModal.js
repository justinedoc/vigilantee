import Swal from "sweetalert2";

export const handleshowLoadingModal = (title) => {
  Swal.fire({
    title: title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const handlecloseLoadingModal = () => {
  Swal.close();
};
