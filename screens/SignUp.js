import React, { Component } from 'react';
import t from 'tcomb-form-native';
import Person, { formOptions } from '../models/Person';
import signUp from '../actions/users/sign-up';
import { connect } from 'react-redux';
import ReactNative, {
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './SignUp.styles';

 class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { newUser: null };
  }

  componentDidMount() {
    // focus on the "name" field
    this.refs.form.getComponent('name').refs.input.focus();
  }

  clearForm() {
    this.setState({ newUser: null });
  }

  onChange(newUser) {
    this.setState({ newUser });
  }

  onSubmit() {
    const { form } = this.refs;
    const newUser = form.getValue();
    if (!newUser) return;
    console.log(newUser);
    this.props.signUp(newUser);
  }

  render() {
    const Form = t.form.Form;
    const { loading } = this.props
    return (
      <View style={styles.outerContainer}>
         <KeyboardAvoidingView
           behavior="padding"
           style={styles.container}>

          <Text style={styles.title}>Sign up for ShatApp</Text>

          <Form
            ref="form"
            type={Person}
            options={formOptions}
            value={this.state.newUser}
            onChange={this.onChange} />

          <TouchableHighlight
            disabled={loading}
            style={styles.buttonSecondary}
            onPress={Actions.signUp}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = ({ loading }) => ({ loading })

export default connect(mapStateToProps, { signUp })(SignUp)
