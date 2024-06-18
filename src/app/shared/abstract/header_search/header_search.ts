import { GlobalIconsService } from "../../services/globalIcon.service";



export abstract class HeaderSearchClass {
   constructor(
    protected globalIcon: GlobalIconsService
   ){}
}