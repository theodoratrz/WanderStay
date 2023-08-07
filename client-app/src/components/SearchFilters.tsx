import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons';
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { CustomSlider } from "./CustomSlider";
import { PropertySearchFilters } from "../api/entities/SearchPropertiesRequest";
import { PropertyAmenity, PropertyAmenityLabels, PropertyRule, PropertyRuleLabels, PropertyType, PropertyTypeLabels } from "../api/entities/enums";

const MAX_SLIDER_COST = 1000
const SLIDER_MARKS = [0, 100, 250, MAX_SLIDER_COST];

export function SearchFilters({filters, setFilters}: {
    filters: PropertySearchFilters,
    setFilters: (newFilters: PropertySearchFilters) => void
}) {
    console.log(filters)
    return (
        <div className="flex flex-col w-1/3 border-2 border-main-petrol rounded-md h-full">
            <div className="flex border-b-2 border-main-petrol justify-center">
                <b>Φιλτράρισμα κατά:</b>
            </div>
            <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start mt-2 pl-3">
                <b>Ο συνολικός προϋπολογισμός σας:</b>
                <CustomSlider 
                    marks={SLIDER_MARKS.map((c, i) => {
                        return {
                            value: c,
                            label: `${c}€${i === SLIDER_MARKS.length - 1  ? '+' : ''}`
                        };
                    })}
                    setValue={val => 
                        setFilters({
                            ...filters,
                            maxCost: val
                        })
                    }
                    value={filters.maxCost}
                />
            </div>
            <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start pl-3 mt-2">
                <b>Τύπος Δωματίου:</b>
                {
                    Object.values(PropertyType).map((type, i) => 
                        <CheckboxWithLabel 
                            key={i}
                            label={PropertyTypeLabels[type]}
                            isChecked={filters.type === type}
                            setIsChecked={isChecked => 
                                setFilters({
                                    ...filters,
                                    type: isChecked ? type : undefined
                                })
                            }
                        />
                    )
                }
            </div>
            <div className="flex flex-col justify-center items-start pl-3 mt-2">
                <b>Παροχές:</b>
                {
                    Object.values(PropertyAmenity).map((amenity, i) => 
                        <CheckboxWithLabel 
                            key={i}
                            label={PropertyAmenityLabels[amenity]}
                            isChecked={filters.amenityFilters[amenity]}
                            setIsChecked={isChecked => 
                                setFilters({
                                    ...filters,
                                    amenityFilters: {
                                        ...filters.amenityFilters,
                                        [amenity]: isChecked
                                    }
                                })
                            }
                        />
                    )
                }
            </div>
            <div className="flex flex-col justify-center items-start pl-3 mt-2">
                <b>Κανόνες Ενοικίασης:</b>
                {
                    Object.values(PropertyRule).map((rule, i) => 
                        <CheckboxWithLabel 
                            key={i}
                            label={PropertyRuleLabels[rule]}
                            isChecked={filters.ruleFilters[rule]}
                            setIsChecked={isChecked => 
                                setFilters({
                                    ...filters,
                                    ruleFilters: {
                                        ...filters.ruleFilters,
                                        [rule]: isChecked
                                    }
                                })
                            }
                        />
                    )
                }
            </div>
        </div>
    );
}
