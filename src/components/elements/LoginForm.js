import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function LoginForm({formType}) {
  return (
    <div id="formWrapper" className="text-white">
      <video src="./video/black-cubes.mp4" autoPlay muted loop />
      <main>
        {formType === "sign-in" ?
          <SignInForm /> :
          <SignUpForm />}
      </main>
    </div>
  )
}
