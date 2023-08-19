import { FaAngleUp } from 'react-icons/fa';

export default function About() {

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{ marginTop: '100px', width: "70vw", textAlign: "center", marginLeft: "15vw" }}>To access network-based services including email, file servers, and business applications, every user must be authenticated. Managing user access individually is time consuming and inefficient.
        Using groups can help you simplify user management as changes to group access rights are automatically applied to all members of the group.
        You can group users based on common or shared traits. For example, to make it easier for your sales team to access shared sales documentation,
        you can create a group named Sales and grant group members access to the Sales Documentation folder on your org file server.
        Groups are important tools for identity management systems, and group data typically resides in a directory.
        Most applications support groups, either at the application level, or within the application to specific resources.
        When searching for a group on the Groups  page of the Admin Console, you can search for a group by full or partial group name.
        If you search for a partial group name, only those groups matching the prefix are returned. For example, if there is a group named Group 1 and you enter 1 as the partial search term, no results are returned.
        If you enter Group as the partial search term, all groups beginning with Group are returned.</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="top-to-btm">
        <FaAngleUp className="icon-position icon-style" onClick={goToTop} />
      </div>
    </div>
  );
}

