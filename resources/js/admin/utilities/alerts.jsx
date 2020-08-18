import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function activeToaster(response) {
	switch (response.status) {
		case 'success':
			toast.success(response.message, {
				autoClose: 3000,
				containerId: 'B',
				position: toast.POSITION.TOP_RIGHT
			});
			break;
		case 'error':
			toast.error(response.message, {
				autoClose: 3000,
				containerId: 'B',
				position: toast.POSITION.TOP_RIGHT
			});
			break;
		case 'warn':
			toast.warn(response.message, {
				autoClose: 3000,
				containerId: 'B',
				position: toast.POSITION.TOP_RIGHT
			});
			break;
		case 'primary':
			toast.primary(response.message, {
				autoClose: 3000,
				containerId: 'B',
				position: toast.POSITION.TOP_RIGHT
			});
			break;
	}
}
