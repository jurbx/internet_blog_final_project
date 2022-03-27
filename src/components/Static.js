import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import About from "./About/About";
import SignForm from "./SignForm/SignForm";
import UserAccount from "./UserAccount/UserAccount";
import SinglePost from "./SinglePost/SinglePost";
import EditPost from "./Post/EditPost";
import EditUserAccount from "./UserAccount/EditUserAccount";

export default function Static({item}) {

  return (<>
    <Header activeTab={item} />
    {
    item === "home" ? <Home /> :
    item === "sign-in" || item === "sign-up" ? <SignForm formType={item} /> :
    item === "about" ? <About /> :
    item === "account" ? <UserAccount /> :
    item === "account-edit" ? <EditUserAccount /> :
    item === "single-post" ? <SinglePost /> :
    item === "create-post" ? <EditPost type="create" /> :
    item === "edit-post" ? <EditPost type="edit" /> :
    <NotFound />
    }

    <Footer />
  </>)
}
