import { login, signup } from '../UsersAPI';
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from '../context/LoginContextProvider';
import { useMutation } from "react-query"



export const useLoginMutation = (setErrorText) => {

    const { internalLogin } = useContext(loginContext);
    const history = useHistory();

    return useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response.token) {
                internalLogin({ ...response });
                setErrorText("");
                history.push('/');
            } else if (response.message) {
                setErrorText(response.message);
            }
        },
        onError: (error) => {
            console.log(error);
            setErrorText("Network or server error");
        }

    });
}

export const useSignUpMutation = (setErrorText) => {

    const { internalLogin } = useContext(loginContext);
    const history = useHistory();

    return useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            if (response.token) {
                internalLogin({ ...response });
                setErrorText("");
                history.push('/');
            } else if (response.message) {
                setErrorText(response.message);
            }
        },
        onError: (error) => {
            console.log(error)
            setErrorText("Network or server error");

        }
    })
}