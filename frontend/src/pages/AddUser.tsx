import { useNavigate } from "react-router";
import View from "../components/View/View";
import { gql, useMutation } from "@apollo/client";
import { useAuthState } from "../components/Auth";
import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import useForm from "../components/Form/useForm";
import TextField from "../components/TextField/TextField";
import { useEffect, useState } from "react";
import { StyleSheet, css } from 'aphrodite';
import { Colors } from '../components/GlobalStyles';
import { createStyle } from '../util/createStyle';
import Paragraph from "../components/Paragraph/Paragraph";


const ADD_USER = gql`
mutation createUser($firstname: String!, $lastname: String!, $email: String!, $password: String!, $admin: Boolean!){
    user: createUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password, admin: $admin){
        firstName
        lastName
        email
        isAdmin
    }
}
`;

type CreateUserResponse = {
    user: User;
}

type CreateUserInput = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    admin: boolean;
}

type User = {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    isDisabled: boolean;
    isAdmin: boolean;
}


export default function AddUser() {
    const navigate = useNavigate();
    const { state } = useAuthState();
    const [createUser, { data }] = useMutation<CreateUserResponse>(ADD_USER, { errorPolicy: 'all' });
    const [hasError, setHasError] = useState<boolean>(false);



    const handleCreateUser = async (values: CreateUserInput) => {
        const { data } = await createUser({
          variables: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            admin: values.admin,
          },
        });
    
        if (!data?.user) {
            setHasError(true);
        }
      }

      const createUserForm = useForm<CreateUserInput>({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          admin: false,
        },
        onSubmit: handleCreateUser,
      });

    //plug in the new info-runs when a new user is returned, so remind them to add the user to google drive
    //issue that user does not reload
      if (data?.user) {
        return (
            <p>Don't forget to add the user to the google folder!</p>
        );
      }

      
    //Returns a form to fill out users information
    return (      
        <View container alignItems='center' justifyContent='center' width='100%' flexDirection="column">
        <Button label='Cancel' href='/users' variant='secondary' onDark type='submit' style={{ width: '20%' }} />

        <View>
            <Form handleSubmit={createUserForm.handleSubmit}>
                <View container gap= '8px' flexDirection="column">
                    <TextField label='First Name' name='firstname' type='text' value={createUserForm.values.firstname} error={createUserForm.errors.firstname} onChange={createUserForm.handleChange} onValidate={createUserForm.handleValidate} required />
                    <TextField label='Last Name' name='lastname' type='text' value={createUserForm.values.lastname} error={createUserForm.errors.lastname} onChange={createUserForm.handleChange} onValidate={createUserForm.handleValidate} required />
                    <TextField label='Email' name='email' type='text' value={createUserForm.values.email} error={createUserForm.errors.email} onChange={createUserForm.handleChange} onValidate={createUserForm.handleValidate} required />
                    <TextField label='Password' name='password' type='text' value={createUserForm.values.password} error={createUserForm.errors.password} onChange={createUserForm.handleChange} onValidate={createUserForm.handleValidate} required />
                    {hasError && <Paragraph style={{ color: Colors.error }}>Invalid email or password</Paragraph>}
                    <Button label='CreateUser' variant='primary' type='submit' />
                </View>
            </Form>
        </View>
        </View> 
    );
}  
  