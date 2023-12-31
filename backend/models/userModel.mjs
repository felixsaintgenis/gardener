import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error('Veuillez remplir les champs requis');
  }
  if (!validator.isEmail(email)) {
    throw Error("Cet email n'est pas valide");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Le mot de passe n'est pas assez sécurisé");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error('Cet email est déjà utilisé par un autre compte');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Veuillez remplir les champs requis');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Les informations de connection sont incorrectes');
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Les informations de connection sont incorrectes');
  }
  return user;
};

export default mongoose.model('User', userSchema);
