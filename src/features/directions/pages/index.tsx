import { CreateDirectionModal } from "../components/CreateDirectionModal"
import style from './directionPage.module.css'

export const DirectionPage = () => {
     return (
          <div className={style.container}>
               <CreateDirectionModal/>
          </div>
     )
}