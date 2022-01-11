import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";
import Home from "./elements/Home";
import About from "./elements/About";
import LoginForm from "./elements/LoginForm";
import UserAccount from "./elements/UserAccount";
import SignOut from "./elements/SignOut";

export default function Static({item}) {

  return (<>
    <Header activeTab={item} />
    {
    item === "home" ?
      <Home /> :
    item === "sign-in" ?
      <LoginForm formType="sign-in" /> :
    item === "sign-up" ?
      <LoginForm formType="sign-up" /> :
    item === "sign-out" ?
      <SignOut /> :
    item === "about" ?
      <About /> :
    item === "account" ?
      <UserAccount /> :
      <NotFound />
    }

    <Footer />
  </>)
}
