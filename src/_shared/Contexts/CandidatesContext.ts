import {createContext} from "react";

import Candidate from "../Models/Candidate";

const candidatesContext = createContext<Array<Candidate>>([]);

export default candidatesContext;