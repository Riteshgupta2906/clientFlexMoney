import Swal from "sweetalert2";
export function Modal() {
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Processing...",
    showConfirmButton: false,
  });
}
