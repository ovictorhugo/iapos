import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { Header } from "./Header";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from 'highcharts'
import { CursorText, HouseSimple, Lightbulb, ListDashes, MagnifyingGlass, PaperPlaneTilt, TextAlignLeft } from "phosphor-react";
import { Link } from "react-router-dom";

import footer2 from '../assets/footer2.png';


interface PalavrasChaves {
  term: string;
  among: number;
}

interface Post {
  frequency: string
  term: string
  checked: boolean
  area_expertise: string
  area_specialty: string
}

export function ContentTerms() {
  const [botaoPesquisadoresClicado, setBotaoPesquisadoresClicado] = useState(false)
  const [botaoTermosClicado, setBotaoTermosClicado] = useState(true)
  const [botaoResumoClicado, setBotaoResumoClicado] = useState(false)
  const [botaoAreasClicado, setBotaoAreasClicado] = useState(false)
  const { urlGeral, setUrlGeral } = useContext(UserContext);

  const [pesquisaInput, setPesquisaInput] = useState('');

  function handlePesquisaChange(event: React.ChangeEvent<HTMLInputElement>) {
    const valorDigitado = event.target.value;
    setPesquisaInput(valorDigitado);

    setResultados([])
  }

  const [words, setWords] = useState<PalavrasChaves[]>([]);

  let urlPalavrasChaves = `${urlGeral}lists_word_researcher?researcher_id=`

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(urlPalavrasChaves, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'text/plain'
          }
        });
        const data = await response.json();
        if (data) {
          setWords(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    fetchData();
  }, [urlPalavrasChaves]);

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // ...
    if (words) {
      const categories = words.map((d) => d.term);
      const amongValues = words.map((d) => Number(d.among));
      const sumAmongValues = amongValues.reduce((acc, cur) => acc + cur, 0);

      setChartOptions({
        chart: {
          type: "area",
          backgroundColor: "transparent",
          fontFamily: "Ubuntu, sans-serif",
          height: '590px', // Define a altura como 100% da tela
          position: "relative",
        },
        title: {
          text: "",
        },
        xAxis: {
          categories,
          labels: {
            enabled: false, // Remove as legendas do eixo x
          },
        },
        yAxis: {
          labels: {
            enabled: false, // Remove as legendas do eixo y
          },
        },
        series: [
          {
            data: amongValues,
          },
        ],

        credits: {
          enabled: false,
        },
        plotOptions: {
          area: {
            color: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, "#005399"],   // Cor inicial (transparente)
                [1, "#f9f9f9"],       // Cor final (#005399)
              ],
            },
            lineWidth: 0,
          },
        },
        animation: {
          duration: 100000, // Duração da animação em milissegundos
        },
      });
    }
  }, [words]);

  const [resultados, setResultados] = useState<Post[]>([]);

  let urlTerms = urlGeral + `/originals_words?initials=&type=ARTICLE`;
  const pesquisaInputFormatado = pesquisaInput.trim().replace(/\s+/g, ";");

  if (botaoTermosClicado) {
    urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
  }

  if (botaoResumoClicado) {
    urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ABSTRACT`;
  }

  if (botaoAreasClicado) {
    urlTerms = urlGeral + `/area_specialitInitials?initials=${pesquisaInput}&area=`;
  }

  console.log('urlTerms' + urlTerms)

  useEffect(() => {

    fetch(urlTerms, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'Content-Type': 'text/plain'

      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newData = data.map((post: Post) => ({
          ...post,
          term: post.term
        }));
        setResultados([]);
        setResultados(newData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [urlTerms]);

  // Termos 
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([]);

  const checkboxItems = resultados.map((resultado) => (
    <li
      key={resultado.term}
      className="checkboxLabel group list-none inline-flex mr-4 mb-4 group overflow-hidden"
      onMouseDown={(e) => e.preventDefault()}
    >
      <label className="group-checked:bg-blue-400 cursor-pointer border-[1px] bg-white border-gray-300 flex h-10 items-center px-4 text-gray-400 rounded-md text-xs font-bold hover:border-blue-400 hover:bg-blue-100">
        <span className="text-center block">{botaoResumoClicado || botaoTermosClicado ? (resultado.term) : ('')}
          {botaoAreasClicado ? (`${resultado.area_specialty} | ${resultado.area_expertise}`) : ('')}</span>
        <input
          type="checkbox"
          name={resultado.term}
          className="absolute hidden group"

          id={resultado.term}
        />
      </label>
    </li>
  ));

  //Se o botão Termos for clicado
  const handleClickTermos = () => {
    setBotaoPesquisadoresClicado(false);
    setBotaoTermosClicado(true);
    setBotaoAreasClicado(false);
    setBotaoResumoClicado(false)

    setResultados([])
    setPesquisaInput('')
  };

  const handleClickResumo = () => {
    setBotaoPesquisadoresClicado(false);
    setBotaoResumoClicado(true);
    setBotaoAreasClicado(false);
    setBotaoTermosClicado(false)

    setResultados([])
    setPesquisaInput('')
  };

  const handleClickAreas = () => {
    setBotaoAreasClicado(true);
    setBotaoPesquisadoresClicado(false);
    setBotaoTermosClicado(false);
    setBotaoResumoClicado(false)

    setResultados([])
    setPesquisaInput('')
  };



  return (
    <div className="h-screen ">

      <Header />

      <div className="overflow-hidden absolute  py-24 px-6 md:px-16 w-full ">
        <div className="z-[-999999999] w-[120%] absolute top-[0] left-[-100px]">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>

        <div className="rounded-lg">
          <div className="bg-blue-400 min-h-[340px] flex items-center bg-opacity-30 backdrop-blur-sm rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full px-10">
              <div className=" justify-start flex flex-col w-full h-full sm:items-center transition py-12">
                <h1 className="text-left text-white lg:leading-[3.5rem] max-w-[700px] font-light text-4xl mb-2">Dicionário de <strong className="bg-red-400">termos e área de especialidade</strong></h1>
                <p className="text-white ">Para ajudar a sua pesquisa, fornecemos uma lista extensa de termos e áreas de especialidade, abrangendo diversos setores.</p>
              </div>

              <div className="flex items-center">
                <div className={`rounded-l-md flex items-center bg-white h-14 group w-full  text-base font-medium  justify-center transition border-[1px] border-gray-300 ${botaoTermosClicado ? 'hover:border-[#005399]' : ''} ${botaoResumoClicado ? 'hover:border-red-400' : ''} ${botaoAreasClicado ? 'hover:border-[#8FC53E]' : ''} ${botaoPesquisadoresClicado ? 'hover:border-[#20BDBE]' : ''}`}>
                  <MagnifyingGlass size={20} className={`text-gray-400 min-w-[52px] ${botaoTermosClicado ? 'group-hover:text-[#005399]' : ''} ${botaoResumoClicado ? 'group-hover:text-red-400' : ''} ${botaoAreasClicado ? 'group-hover:text-[#8FC53E]' : ''} ${botaoPesquisadoresClicado ? 'group-hover:text-[#20BDBE]' : ''}`} />
                  <input
                    type="text"
                    value={pesquisaInput}
                    onChange={handlePesquisaChange}
                
                    name=""
                    placeholder={
                      `${botaoResumoClicado ? 'Pesquise por uma ou mais palavras no resumo do pesquisador (Ex: Robótica, educação, indústria)' : ''} ${botaoTermosClicado ? 'Pesquise um ou mais termos (Ex: Robótica, educação, indústria)' : ''} ${botaoAreasClicado ? 'Pesquise uma ou mais áreas de especialidade (Ex: Astronomia, Ciência de dados)' : ''} ${botaoPesquisadoresClicado ? 'Pesquise o nome de um ou mais pesquisador(es)' : ''}`
                    }
                    id="" className="w-full h-full outline-none" />
                </div>

                <div className={`bg-white  p-2 flex gap-2  border-[1px] border-gray-300 border-l-0 rounded-r-md`}>

                  <div onClick={handleClickTermos} className={`outline-none cursor-pointer text-sm rounded-full text-gray-400 flex items-center border-[1px] border-white gap-2 px-4 py-2 font-semibold transition ${botaoTermosClicado ? "activeTermos" : ('')}`}>
                    <CursorText size={16} className="" />
                    Termo
                  </div>

                  <div onClick={handleClickResumo} className={`outline-none cursor-pointer text-sm rounded-full text-gray-400 flex items-center border-[1px] border-white gap-2 px-4 py-2 font-semibold transition ${botaoResumoClicado ? "activeResumo" : ('')}`} >
                    <TextAlignLeft size={16} className="" />
                    Resumo
                  </div>

                  <div onClick={handleClickAreas} className={`outline-none cursor-pointer text-sm text-gray-400 rounded-full flex items-center gap-2 px-4 py-2 font-semibold  transition ${botaoAreasClicado ? "activeAreas" : ('')}`}>
                    <Lightbulb size={16} className="" />
                    Áreas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[535px] px-6 md:px-16 pb-16">
        <h2 className="mb-4 text-2xl font-medium text-gray-400">Palavra em <strong className="font-bold text-white bg-blue-400">{botaoResumoClicado ? "resumo" : (botaoAreasClicado ? "áreas" : "termo")}</strong></h2>
        {pesquisaInput.length == 0 ? (<p className="text-gray-400 mb-8">Mostrando as 50 palavras mais frequentes, digite para aparecer mais</p>) : ('')}
        {checkboxItems}
      </div>

      

    </div>
  )
}