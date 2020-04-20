import React from "react";
import Typed from "typed.js";
import { Button, Fade, Card, CardContent } from "@material-ui/core";
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.title = React.createRef();
  }
  componentDidMount() {
    this.typed = new Typed(this.title.current, {
      strings: ["Welcome To Chase and Attack!!!"],
      typeSpeed: 100,
      showCursor: false,
      onComplete: (self) => this.setState({ show: true }),
    });
  }
  componentWillUnmount() {
    this.typed.destroy();
  }
  render() {
    return (
      <>
        <Card>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 ref={this.title}></h1>
            </div>
            <span>
              <Fade
                timeout={1000}
                in={this.state.show}
                mountOnEnter
                unmountOnExit
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.props.onNext}
                >
                  LET'S GO...
                </Button>
              </Fade>
            </span>
          </CardContent>
        </Card>
      </>
    );
  }
}
