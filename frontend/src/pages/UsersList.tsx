import { useNavigate } from "react-router";
import View from "../components/View/View";
import { gql, useQuery } from '@apollo/client'
import { useAuthState } from "../components/Auth";
import Button from "../components/Button/Button";
import { StyleSheet, css } from 'aphrodite';
import { Colors } from '../components/GlobalStyles';
import { createStyle } from '../util/createStyle';



//TODO: Button to each row to remove user
//Button in each row to upgrade user to admin
//button to add a user, pop up
//info button explaining what everything is


//  style={{ backgroundColor: Colors.isuRed, borderBottom: `4px solid ${Colors.isuYellow}`, color: '#ffffff', width: '80%', padding: '15px', }}>

const styles = StyleSheet.create({
    usertable: {
        padding: '16px',
        'user-select': 'none',
        ':hover': {
          backgroundColor: Colors.neutralHover,
          cursor: 'pointer',
        },
        ':active': {
          backgroundColor: Colors.neutralActive,
        
        },
    },
    table: {
        backgroundColor: Colors.isuRed,
        borderBottom: `4px solid ${Colors.isuYellow}`,
        color: '#ffffff',
        width: '100%',
        padding: '15px',
    }
});

//css(styles.usertable)



//query defined in backend
const GET_ALL_USERS = gql`
query getAllUsers {
    all{
        id
        firstName
        lastName
        email
        isDisabled
        isAdmin
    }
}
`;

type GetAllUsersResponse = {
    all: User[] | null;
}

type User = {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    isDisabled: boolean;
    isAdmin: boolean;
}

function determineAdmin(person: User){
    if (person.isAdmin){
        return "Admin";
    }
    else{
        return "Not Admin";
    }
}

//allows admin users to access user information
const Page: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const { state } = useAuthState();
    const { data } = useQuery<GetAllUsersResponse>(GET_ALL_USERS);

    if (!state.user?.isAdmin) {
        navigate('/');
    }

    //Returns a table with each user's information
    return (      
        <View container alignItems='center' justifyContent='center' width='100%'>
        <table style={{ borderBottom: `4px solid ${Colors.isuYellow}`, width: '80%', padding: '15px', }}>
            <tr>
                <th style={{textAlign: 'left'}}>First Name</th>
                <th style={{textAlign: 'left'}}>Last Name</th>
                <th style={{textAlign: 'left'}}>Email</th>
                <th style={{textAlign: 'left'}}>Admin?</th>
            </tr>
            {data?.all?.map((user) => {
                    return(
                    <tr>
                        <td>{user.firstName}</td> 
                        <td>{user.lastName}</td> 
                        <td>{user.email}</td> 
                        <td>{determineAdmin(user)} </td> 
                        <td>
                            <Button label='Remove' href='/login' variant='secondary' onDark type='submit' style={{ width: '100%' }} />
                        </td>
                        <td>
                            <Button label='Make Admin' href='/login' variant='secondary' onDark type='submit' style={{ width: '100%' }} />
                        </td>
                        
                    </tr>
                    );
                })}

        </table>
        </View> 
    );
}  
export default Page
  