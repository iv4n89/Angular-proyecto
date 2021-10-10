import Swal from 'sweetalert2';

const toastSwal = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer),
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export function successToast(message: string) {
  toastSwal.fire({
              icon: 'success',
              title: message
            })
}

export function failToast(message: string) {
  toastSwal.fire({
    icon: 'error',
    title: message
  });
}

export function infoToast(message: string) {
  toastSwal.fire({
    icon: 'info',
    title: message
  });
}

export function warningToast(message: string) {
  toastSwal.fire({
    icon: 'warning',
    title: message
  });
}
