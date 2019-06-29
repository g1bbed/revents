/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
//npm install --save cuid
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
// import { combineReducers } from "redux";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired({ message: "city" }),
  venue: isRequired({ message: "venue" }),
  date: isRequired("date")
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
  state = {
    cityLatlng: {},
    venueLatlng: {}
  };

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatlng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatlng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatlng: latlng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Header sub color="teal">
            Event Details
          </Header>
          <Form
            onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            autoComplete="off"
          >
            <Field
              name="title"
              component={TextInput}
              placeholder="Give your event a name"
            />
            <Field
              name="category"
              component={SelectInput}
              options={category}
              placeholder="What is your event about?"
            />
            <Field
              name="description"
              component={TextArea}
              rows="3"
              placeholder="Tell us about your event"
            />
            <Header sub color="teal">
              Event Location Details
            </Header>
            <Field
              name="city"
              component={PlaceInput}
              options={{ types: ["(cities)"] }}
              onSelect={this.handleCitySelect}
              placeholder="event city"
            />
            <Field
              name="venue"
              component={PlaceInput}
              options={{
                location: new google.maps.LatLng(this.state.cityLatlng),
                radius: 1000,
                types: ['establishment']
              }}
              onSelect={this.handleVenueSelect}
              placeholder="event venue"
            />
            <Field
              name="date"
              component={DateInput}
              dateFormat="dd LLL yyyy h:mm a"
              showTimeSelect
              timeFormat="HH:mm"
              placeholder="event date"
            />
            <Button
              disabled={invalid || submitting || pristine}
              positive
              type="submit"
            >
              Submit
            </Button>
            <Button
              onClick={
                initialValues.id
                  ? () => history.push(`/events/${initialValues.id}`)
                  : () => history.push("/events")
              }
              type="button"
            >
              Cancel
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm", validate })(EventForm));
