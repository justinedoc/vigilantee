import { useState } from "react";
import { Main } from "./Main";
import { MembersSection } from "./MembersSection";
import { Navbar } from "./Navbar";

export function Dashboard({ authStatus }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const compsRequirements = { modalOpen, setModalOpen, userID, setUserID };

  function handleSetNavOpen() {
    setNavOpen((cur) => !cur);
  }

  return (
    <>
      <Navbar
        authStatus={authStatus}
        onHandleSetNavOpen={handleSetNavOpen}
        navOpen={navOpen}
      />
      <Main data={compsRequirements} navOpen={navOpen} />
      <MembersSection data={compsRequirements} />
    </>
  );
}
