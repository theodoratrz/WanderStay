import { PropertyAmenityFlags } from "../api/entities/propertyEnums"
import { PropertyFlagsCheckList } from "./PropertyFlagsCheckList"

interface PropertyAmenitiesSectionProps{
    amenityFlags: PropertyAmenityFlags,
    setAmenityFlags?: (flags: PropertyAmenityFlags) => void,
    editable: boolean
}

export function PropertyAmenitiesSection(props: PropertyAmenitiesSectionProps){
    return(
        <div className="flex flex-col items-start border-2 border-main-petrol rounded-md p-2 gap-2 w-3/5 text-base">
            <div className='text-xl font-bold mb-2'>Παροχές</div>
            <PropertyFlagsCheckList
                editable={props.editable}
                fieldFlags={props.amenityFlags}
                setFieldFlags={props.setAmenityFlags}
            />
        </div>
    )
}