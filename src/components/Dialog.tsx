import { useEffect, useRef } from "react";


export const Dialog = ({isOpen, onClose, children}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal()
        }
        else{
            dialog.close()
        }
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleClick = (event: MouseEvent) => {
            if(event.target === dialogRef.current) {
                onClose();
            }
        }

        const handleClose = () => {
            onClose();
        };

        dialog.addEventListener('close', handleClose);
        dialog.addEventListener('click', handleClick)
        return () => {
            dialog.removeEventListener('close', handleClose);
            dialog.removeEventListener('click', handleClick)

        };
    }, [onClose]);

    return (
        <dialog ref={dialogRef}>
        {children}
    </dialog>)
}