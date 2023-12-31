import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { Ilustracao } from "./Ilustracao";
import { ArrowCircleDown, Info, Funnel, User, File, Buildings, PaperPlaneTilt, ChartLine, Question, SignIn, ListDashes, UserCirclePlus, UserCircle, BookOpen } from "phosphor-react";

import logo_1 from '../assets/logo_1.png';
import logo_2 from '../assets/logo_2.png';
import logo_3 from '../assets/logo_3.png';
import logo_4 from '../assets/logo_4.png';

import { Pesquisadores } from "./Pesquisadores";
import { Publicacoes } from "./Publicacoes";

type Total = {
  organizations: string,
  publications: string,
  researcher: string
}

import cimatec from '../assets/cimatec.png';

export function Header() {


  return (
    <header className={` z-[9999999] px-6 md:px-16 w-full mb-4 h-20 justify-between items-center flex absolute top-0`}>
      <div className=" w-full flex items-center h-12 ">
        <div className="flex gap-6 items-center h-full justify-center ">
          <Link to={"/"} className="h-[25px]  "><Logo /></Link>

          <Link to={"/"} className="h-[30px] "><img src={cimatec} alt="" className="h-[30px]" /></Link>
        </div>

        <div className="md:flex h-full hidden bg-white rounded-md   ml-4">
          <a href={"https://www.senaicimatec.com.br/"} className="flex items-center h-full   px-4  text-gray-400 text-sm font-bold transition  gap-2"><PaperPlaneTilt size={16} className="text-gray-400" />SENAI | CIMATEC</a>
          
          <Link to={"/terms"} className="flex items-center h-full  px-4 text-gray-400 text-sm font-bold transition  gap-2"><ListDashes size={16} className="text-gray-400" />Dicionário</Link>
          <Link to={"/magazine"} className="flex items-center h-full  px-4 text-gray-400 text-sm font-bold transition  gap-2"><BookOpen size={16} className="text-gray-400" />Revistas</Link>

        </div>
      </div>

      <div className="flex gap-4">
      
        </div>
    </header>
  )
}