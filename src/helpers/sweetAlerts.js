import Swal from "sweetalert2";
import logoSpinner from "../img/The Rolling Post.jpg"

export const spinner = () => {
    Swal.fire({
        imageUrl: logoSpinner,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Rolling Post Logo',
        title: 'Ya llega el diario.',
        showConfirmButton: false
      })
    setTimeout(() => {
      Swal.close()
    }, 500);
}