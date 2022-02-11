import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";

const LOGIN = gql`
  mutation Register($name: String!, $password: String!) {
    register(name: $name, password: $password)
  }
`;

const Register = () => {
  const elName = useRef(null);
  const elPassword = useRef(null);

  const [login] = useMutation(LOGIN);

  async function handleSubmit(evt) {
    evt.preventDefault();

    const result = await login({
      variables: { name: elName.current.value, password: elPassword.current.value },
    });

    if (result) {
      window.localStorage.setItem("auth_token", JSON.stringify(result.data.login));
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input ref={elName} type="text" placeholder="Username" />
        <input ref={elPassword} type="password" placeholder="Password" />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Register;
