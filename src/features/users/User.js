import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { Badge } from 'reactstrap'



const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'
        const formatDate = (dateString) => {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? '-' : 
              date.toLocaleString('en-US', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              });
          };

        return (
            <tr className='rowClassName'>
                
                <td className="py-3"><span className="mb-0 text-base">
                {user.username}
                          </span></td>
                          
                <td className="py-3">{formatDate(user.createdAt)}</td>
                <td className="py-3 text-center">
                    {user.roles.map(role => (
                    <Badge 
                    key={role} 
                    bg="secondary" 
                    className="me-1"
                    >
                        {role}
                    </Badge>
                    ))}
                </td>
                <td className="py-3 text-center">
          <Badge 
            bg={user.active ? "success" : "danger"}
            className="centered-badge"
          >
            {user.active ? "Yes" : "No"}
          </Badge>
        </td>
                <td className={`table__cell ${cellStatus}`}>
                <button
                
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="fa-xs" />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User