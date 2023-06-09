import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles
        .map((x) => [x.toUpperCase(), 1500])
        .flat();
    }

    const HeaderTitleTypeAnimation = React.memo(
      () => {
        return (
          <Typical className="title-styles" steps={this.titles} loop={50} />
        );
      },
      (props, prevProp) => true
    );

    if (this.props.sharedData) {
      var networks = this.props.sharedData.icons.map(function (network) {
        var icon;
        if (network.name === "resume") {
          icon = (
            <span key={network.name} className="m-4">
              <a
                href={`${process.env.PUBLIC_URL}/${network.url}`}
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className={network.class}
                  style={{ fontSize: "4rem", color: "black" }}
                ></i>
              </a>
            </span>
          );
        } else if (network.name === "email") {
          icon = (
            <span key={network.name} className="m-4">
              <a href={network.url}>
                <i
                  className={network.class}
                  style={{ fontSize: "4rem", color: "black" }}
                ></i>
              </a>
            </span>
          );
        } else {
          icon = (
            <span key={network.name} className="m-4">
              <a href={network.url} target="_blank" rel="noreferrer">
                <i
                  className={network.class}
                  style={{ fontSize: "4rem", color: "black" }}
                ></i>
              </a>
            </span>
          );
        }

        return (
          <OverlayTrigger
            placement="bottom"
            overlay={(props) => (
              <Tooltip id={`${network.name}-tooltip`} {...props}>
                <p style={{ fontSize: "1.4rem" }}>
                  {network.name.charAt(0).toUpperCase() + network.name.slice(1)}
                </p>
              </Tooltip>
            )}
          >
            {icon}
          </OverlayTrigger>
        );
      });
    }

    return (
      <header
        id="home"
        style={{ height: window.innerHeight - 140, display: "block" }}
      >
        <div className="row aligner" style={{ height: "100%" }}>
          <div className="col-md-12">
            <div>
              <span
                className="iconify header-icon"
                data-icon="la:laptop-code"
                data-inline="false"
              ></span>
              <br />
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>

              <Switch
                checked={this.state.checked}
                onChange={this.onThemeSwitchChange}
                offColor="#baaa80"
                onColor="#353535"
                className="react-switch mx-auto"
                width={90}
                height={40}
                uncheckedIcon={
                  <span
                    className="iconify"
                    data-icon="twemoji:owl"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "20px",
                      color: "#353239",
                    }}
                  ></span>
                }
                checkedIcon={
                  <span
                    className="iconify"
                    data-icon="noto-v1:sun-with-face"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "10px",
                      color: "#353239",
                    }}
                  ></span>
                }
                id="icon-switch"
              />

              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "20rem" }}
              >
                {networks}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
