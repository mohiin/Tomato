
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets.js";

export default function ExploreMenu({category, setCategory}){
    return(
        <div className="explore-menu">
            <h2>Inspiration for your first order</h2>
            <div className="explore-menu-list">
            {
                menu_list.map((item, index)=>{
                    return <div onClick={()=> setCategory(prev=> prev===item.menu_name? "All": item.menu_name)} className="explore-menu-list-item" key={index}>
                        <img className={category === item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                })
    
            }
            </div>
            
        </div>
    )
}