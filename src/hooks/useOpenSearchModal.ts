import {useEffect} from 'react';

type OpenSearchModal = {
    onOpenModal: () => void
}

export default function useOpenSearchModal(onOpenModal: () => void) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                onOpenModal();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

}


