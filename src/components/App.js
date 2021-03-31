import React, {useState, useEffect} from 'react'
import {Container, Navbar} from 'react-bootstrap'
import "../styles/App.css"
import "../styles/bootstrap.min.css"
import $ from "jquery";

function App() {
  const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [type, setType] = useState("dot");
    const [uyari, setUyari] = useState(false);
    const [uyari2, setUyari2] = useState(false);
    const [uyari3, setUyari3] = useState(false);
    const [uyari4, setUyari4] = useState(false);
    const [uyari5, setUyari5] = useState(false); 
    const [skip, setSkip] = useState(false);
    const [skip2, setSkip2] = useState(false);
    const [draw, setDraw] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const [disabled3, setDisabled3] = useState(true);
    const [disabled4, setDisabled4] = useState(true);
    const [disabled5, setDisabled5] = useState(false);
    //dot properties
    const [dotDraw, setDotDraw] = useState(false);
    const [dots, setDots] = useState([]);
    const [dotX, setDotX] = useState();
    const [dotY, setDotY] = useState();
    const [dotType, setDotType] = useState("");
    const [dotWeight, setDotWeight] = useState("");
    // ***
    //polygon properties
    const [polygonDraw, setPolygonDraw] = useState(false);
    const [polygons, setPolygons] = useState([]);
    const [polygon, setPolygon] = useState({});
    const [points, setPoints] = useState("");
    const [point, setPoint] = useState("");
    const [polygonColor, setPolygonColor] = useState("transparent");
    const [sayi, setSayi] = useState(0);
    const [polygonBan, setPolygonBan] = useState(false);
    const [selected, setSelected] = useState(false);
    // ***
    //polyline properties
    const [polylineDraw, setPolylineDraw] = useState(false);
    const [polylines, setPolylines] = useState([]);
    const [polyline, setPolyline] = useState({});
    const [points2, setPoints2] = useState("");
    const [point2, setPoint2] = useState("");
    const [sayi2, setSayi2] = useState(0);
    const [polylineBan, setPolylineBan] = useState(false);
    
    useEffect(()=>{
        if(dotType=="thin"){
            setDotWeight("2");
        }
        else if(dotType=="normal"){
            setDotWeight("4");
        }
        else if(dotType=="bold"){
            setDotWeight("6");
        }
        else{
            console.log("hata");
        }
    },[dotType])
    useEffect(()=>{
    },[dots])
    useEffect(()=>{
        setPolygons([
            ...polygons,
            polygon
        ])
    },[polygon]);
    useEffect(()=>{
        setPolylines([
            ...polylines,
            polyline
        ])
    },[polyline]);
  return (
    <div className="mainet">
    <Navbar bg="light" expand="md">
    <Container className="text-dark"> 
        <div className="drawon mx-auto">drawon<span className="app">App</span> </div> 
        <span style={{position:"absolute", right:"2rem"}}>
            <button onClick={()=>{
                //jquery ile inputs classına sahip div slideup/slidedown yapılacak
                $("#inputs").fadeToggle("2000");
            }} style={{fontSize:"1.4rem"}} className="btn btn-dark" type="button">On/Off</button>
            </span>
    </Container>
</Navbar>
<div className="zone">
    {draw &&
    <div className="drawing mt-5 mx-auto" style={{position:"relative",width:`${width}px`, height:`${height}px`, border:"black solid 3px"}}>
        {dotDraw && 
        dots.map(dot => (
        <div className="dot" style={{zIndex:"99",position:"absolute",border:`solid black ${dot.dotWeight}px` ,marginLeft:`${dot.dotX}px`, marginTop:`${dot.dotY}px`}}>  
        </div>)) 
        }
        {
            polygonDraw &&
            polygons.map(polygon => (
                <svg style={{position:"absolute"}} height="100%" width="100%">
                    <polygon points={`${polygon.points}`} style={{position:"absolute",fill:`${polygon.polygonColor}`,stroke:"black",strokeWidth:"1"}} />
                </svg>
            ))
        }
        {
            polylineDraw &&
            polylines.map(polyline => (
                <svg style={{position:"absolute"}} height="100%" width="100%">
                    <polyline points={`${polyline.points2}`} style={{position:"absolute",
                        fill:`transparent`,stroke:"black",strokeWidth:"2"}} />
                </svg>
            ))
        }
    </div>
    }
</div>
<div id="inputs" className="inputs">
    <div className="values p-3">
        <div className="values-main">
            <div className="create-container w mr-2 mb-2">
                <h2>Create Container</h2>
                <form>
                    <div className="input-group">
                        <input {...disabled && {disabled}} onChange={(e)=>{setHeight(e.target.value)}} type="text" style={{fontSize:"1.4rem"}} className="form-control mb-2" placeholder="height"/>
                    </div>
                    <div className="input-group">
                        <input {...disabled && {disabled}} onChange={(e)=>{setWidth(e.target.value)}} type="text" style={{fontSize:"1.4rem"}} className="form-control mb-2" placeholder="width"/>
                    </div>
                    <button onClick={()=>{
                        if(!(isNaN(height)) && !(isNaN(width))){
                            setUyari(false);
                            setSkip(true);
                            setDraw(true);
                            setDisabled(true);
                        }
                        else{
                            setUyari(true);
                        }
                    }} type="button" style={{fontSize:"1.4rem"}} className="btn btn-info btn-block">Create</button>
                    {uyari && <p className="uyari">{"Invalid Value(s)!"}</p>}
                    {skip && <p className="skip">{"Next Step!"}</p>}
                </form>
            </div>
            <div className="select-elements w mr-2 mb-2">
                <h2 className="mb-4">Type of element</h2>
                <form>
                    <select style={{fontSize:"1.6rem"}} onChange={(e)=>{
                            setType(e.target.value);
                        }
                    } name="select" id="select" className="mb-2">
                        <option value="dot">Dot</option>
                        <option value="polygon">Polygon</option>
                        <option value="polyline">Polyline</option>
                    </select>
                    <button onClick={()=>{
                        if(type){
                            setUyari2(false);
                            setSkip2(true);
                        }
                        else{
                            setSkip2(false);
                            setUyari2(true);
                        }
                    }} type="button" style={{fontSize:"1.4rem"}} className="btn btn-success btn-block">Get</button>
                    {uyari2 && <p className="uyari">{"Invalid Value(s)!"}</p>}
                </form>
            </div>
            <div className="create-elements w mb-2">
                    <h2 className="mb-4">
                        {(skip && skip2) ? "Properties":"Loading..."} 
                    </h2>
                    {(type==="dot" && (skip && skip2)) &&
                    <div>
                        <div className="input-group mb-2">
                            <input onChange={(e)=>{setDotY(e.target.value)}} style={{fontSize:"1.6rem"}} type="text" className="form-control" placeholder="y value"/>
                        </div>
                        <div className="input-group mb-2">
                            <input onChange={(e)=>{setDotX(e.target.value)}} style={{fontSize:"1.6rem"}} type="text" className="form-control" placeholder="x value"/>
                        </div>
                        <select style={{fontSize:"1.6rem"}} onChange={(e)=>{setDotType(e.target.value)}} name="select2" id="select2" className="mb-2">
                            <option value=""></option>
                            <option value="thin">Thin</option>
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                        </select>
                        <button onClick={()=>{
                            if(!(isNaN(dotX)) || !(isNaN(dotY))){
                                if(dotX<0 || dotY<0){
                                    setUyari3(true);
                                }
                                else{
                                    setUyari3(false);
                                    setDotDraw(true);
                                    setDots(
                                        [
                                            ...dots,
                                            {dotY,dotX,dotType,dotWeight}
                                        ]
                                    )
                                }
                            }
                            else{
                                setUyari3(true);
                            }
                        }} style={{fontSize:"1.4rem"}} type="button" className="btn btn-danger btn-block">Apply</button>
                        {uyari3 && <p className="uyari">{"Invalid Value(s)!"}</p>}
                    </div>
                    }
                    {
                       (type==="polygon" && (skip && skip2)) && 
                       <div>
                            <div className="input-group mb-2">
                                <input onChange={(e)=>{setPoint(e.target.value)}} style={{fontSize:"1.6rem"}} type="text" className="form-control" placeholder="example: x,y"/>
                            </div>
                            <button onClick={()=>{ // getvalue
                                let keeper = point.split(",");
                                let keeperFilter = keeper.filter((i)=>{ 
                                    if(!(isNaN(i)) && i>0){
                                        return true;
                                    }else{return false;}
                                });
                                if(keeperFilter.length<2){
                                    setUyari4(true);
                                }
                                else{
                                    let term = points.concat(point.concat(" ")); 
                                    setPoints(term); 
                                    let artir = sayi+1;
                                    setSayi(artir);
                                    setUyari4(false);
                                    setDisabled2(true);
                                    setPolygonDraw(true);
                                    if(artir>2){
                                        setDisabled3(false);
                                    }
                                }
                            }} style={{fontSize:"1.4rem"}} type="button" className="btn btn-warning btn-block">
                                {`Get values (${sayi})`}
                                </button>

                            <select style={{fontSize:"1.6rem"}} {...disabled2&& {disabled}} className="my-2" onChange={(e)=>{setPolygonColor(e.target.value)}} name="select2" id="select2">
                                <option value="transparent">Transparent</option>
                                <option value="dodgerblue">Dodgerblue</option>
                                <option value="hotpink">Hotpink</option>
                                <option value="crimson">Crimson</option>
                            </select>
                            <button onClick={()=>{ // apply
                                setPolygon({points,polygonColor});
                                let y = polygons;
                                if(polygonBan===false){
                                    y.shift();
                                    setPolygonBan(true);
                                }
                                setPolygons(y);
                                setSayi(0);
                                setDisabled3(true);
                                setDisabled2(false);
                                setPoints("");
                                setSelected(true);
                                setPolygonColor("");
                                setPolygonDraw(true);
                            }} {...disabled3 && {disabled}} style={{fontSize:"1.4rem"}} type="button" className="btn btn-danger btn-block">Apply</button>
                            {uyari4===true && <p className="uyari">Invalid Value(s)!</p>}
                       </div>
                    }
                    {
                       (type==="polyline" && (skip && skip2)) &&
                       <div>
                           <div className="input-group mb-2">
                                <input onChange={(e)=>{setPoint2(e.target.value)}} style={{fontSize:"1.6rem"}} type="text" className="form-control" placeholder="example: x,y"/>
                            </div>
                            <button onClick={()=>{
                                let keeper = point2.split(",");
                                let keeperFilter = keeper.filter((i)=>{ 
                                    if(!(isNaN(i)) && i>0){
                                        return true;
                                    }else{return false;}
                                });
                                
                                if(keeperFilter.length<2){
                                    setUyari5(true);
                                }else{
                                    let term = points2.concat(point2.concat(" ")); 
                                    setPoints2(term); 
                                    let artir = sayi2+1;
                                    setSayi2(artir);
                                    setUyari5(false);
                                    setDisabled5(true); 
                                    setPolylineDraw(true);
                                    if(artir>1){
                                        setDisabled4(false);
                                    }
                                }
                            }} style={{fontSize:"1.4rem"}} type="button" className="btn btn-warning btn-block">
                                {`Get values (${sayi2})`}
                                </button>

                                <button onClick={()=>{
                                    console.log(points2);
                                setPolyline({points2});
                                let y = polylines;
                                if(polylineBan===false){
                                    y.shift();
                                    setPolylineBan(true);
                                }
                                setPolylines(y);
                                setSayi2(0);
                                setDisabled4(true);
                                setDisabled5(false);
                                setPoints2("");
                                setPolylineDraw(true);
                                console.log(polylines);
                            }} {...disabled4 && {disabled}} style={{fontSize:"1.4rem"}} type="button" className="btn btn-danger btn-block">Apply</button>
                                {uyari5===true && <p className="uyari">Invalid Value(s)!</p>}
                       </div>
                    }
            </div>
        </div>
    </div>
    <div className="warnings p-3">
        <div className="warnings-main">
            <h2>WARNING!</h2>
            <p style={{fontSize:"1.4rem"}}>
                You should add value that is compatible <br/> with width value of screen.
            </p>
            <button onClick={()=>{
                window.location.reload();
            }} style={{fontSize:"1.4rem"}} type="button" className="btn btn-danger">RESET</button>
        </div>
    </div>
</div>
</div>
  );
}

export default App;
