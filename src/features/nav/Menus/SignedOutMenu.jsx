import React from "react";
import { Menu, Button } from "semantic-ui-react";

const SignedOutMenu = ({signIn, register}) => {
  return (
    <div>
      <Menu.Item position="right">
        <Button onClick={signIn} basic inverted content="Login" />
        <Button
          basic
          inverted
          content="Register"
          onClick={register}
          style={{ marginLeft: "0.5em" }}
        />
      </Menu.Item>
    </div>
  );
};

export default SignedOutMenu;
