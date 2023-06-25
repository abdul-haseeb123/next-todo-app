import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                // Regular expression pattern for email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                // Test the email against the regex pattern
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
})

let User;

try {
    // Try to retrieve the existing model if it already exists
    User = mongoose.model('User');
  } catch {
    // If the model doesn't exist, create it
    User = mongoose.model('User', userSchema);
  }

// const User = mongoose.model('User', userSchema)

export default User