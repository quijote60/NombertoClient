import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFineTypeById } from './FineTypesApiSlice';
import { Badge } from 'reactstrap';

const FineType = ({ fineTypeId }) => { // Destructure fineTypeId from props
    const fineType = useSelector(state => selectFineTypeById(state, fineTypeId));
    console.log('FineTypeId passed:', fineTypeId); // Debug the ID being passed
    console.log('FineType retrieved:', fineType); // Debug the retrieved fineType

    const navigate = useNavigate();

    if (fineType) {
        const handleEdit = () => navigate(`/dash/finetypes/${fineTypeId}`);

        const formatDate = (dateString) => {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return isNaN(date.getTime())
                ? '-'
                : date.toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                  });
        };

        return (
            <tr>
                <td className="py-3">{fineType.fineTypeId || '-'}</td>
                <td className="py-3">{formatDate(fineType.createdAt)}</td>
                <td className="py-3 text-center">{fineType.fineType || 'Unknown'}</td>
                <td className="py-3">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="fa-xs" />
                    </button>
                </td>
            </tr>
        );
    } else {
        return null;
    }
};

export default FineType;