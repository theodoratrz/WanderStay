import { useContext, useMemo, useState } from "react";
import { PropertyDetails } from "../api/responses/PropertyDetailsResponse";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";
import { AppContext, openModal } from "../AppContext";
import { makePropertyReservation } from "../api/fetchRoutines/propertyAPI";
import { ModalActionResultTemplate } from "./ModalActionResultTemplate";
import dayjs from "dayjs";
import { LoadingSpinner } from "./LoadingSpinner";
import { PageTitleSpan } from "./PageTitleSpan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faHandshake, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "./PrimaryButton";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AvailableTimeSlot } from "../api/entities/AvailableTimeSlot";
import { dateToStr } from "../api/entities/dates";

export function PropertyReservationModal({ property }: {
    property: PropertyDetails
}) {
    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();
    const ctx = useContext(AppContext);
    const searchContext = ctx.state.businessContext.searchContext;

    const [loading, setLoading] = useState(false);

    const [dateFrom, setDateFrom] = useState(() => dayjs(searchContext.dateFrom));
    const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | undefined>(
        () => property.availableSlots.find(
            slot => (
                (dateFrom.isAfter(slot.startDate) || dateFrom.isSame(slot.startDate)) &&
                (dateFrom.isBefore(slot.endDate) || dateFrom.isSame(slot.endDate))
            )
        )
    );
    const [dateTo, setDateTo] = useState(() => {
        const tempDayTo = dayjs(searchContext.dateTo);
        if (
            tempDayTo.isValid() &&
            (tempDayTo.isAfter(selectedSlot?.startDate) || tempDayTo.isSame(selectedSlot?.startDate)) &&
            (tempDayTo.isBefore(selectedSlot?.endDate) || tempDayTo.isSame(selectedSlot?.endDate))
        ) {
            return tempDayTo;
        }
        return dayjs(null);
    });

    const dailyCost = useMemo(() => (
        searchContext.numPersons * property.rules.perGuestCost + property.rules.baseDayCost
    ), [searchContext.numPersons, property.rules.perGuestCost, property.rules.baseDayCost]);    
    const durationInDays = useMemo(() => {
        return Math.ceil(
            (dateTo.valueOf() - dateFrom.valueOf()) /
            (1000 * 60 * 60 * 24)
        );
    }, [dateTo, dateFrom]);

    const makeReservation = () => {
        setLoading(true);
        if (property) {
            makePropertyReservation(property.propertyId, {
                dateFrom: dateToStr(dateFrom.toDate()) ?? '',
                dateTo: dateToStr(dateTo.toDate()) ?? '',
                numPersons: searchContext.numPersons
            })
            .then(response => {
                if (navigateIfAuthFailed(response)) return;
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={response.ok}
                            successText="H Κράτησή σας ολοκληρώθηκε επιτυχώς"
                            errorText="Σφάλμα καταχώρησης Κράτησης"
                        />
                    )
                })
                setLoading(false);
            })
        }
    }
    
    return (
        <div className="w-96 flex flex-col justify-center items-center relative gap-6">
            <LoadingSpinner 
                coverParent
                visible={loading}
            />
            <PageTitleSpan>Η Κράτησή σας</PageTitleSpan>
            <div className="flex flex-col items-center text-lg gap-4">
                <span className="flex justify-start items-center gap-2">
                    <FontAwesomeIcon size="lg" icon={faCalendarAlt}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DateRangePicker
                            value={[dateFrom, dateTo]}
                            onChange={range => {
                                setSelectedSlot(
                                    property.availableSlots.find(
                                        slot => (
                                            (range[0]?.isAfter(slot.startDate) || range[0]?.isSame(slot.startDate)) &&
                                            (range[0]?.isBefore(slot.endDate) || range[0]?.isSame(slot.endDate))
                                        )
                                    )
                                );
                                setDateFrom(dayjs(range[0]));
                                setDateTo(dayjs(range[1]));
                            }}
                            localeText={{ start: 'Check-in', end: 'Check-out' }}
                            shouldDisableDate={(d, pos) => {
                                if (pos === 'start') {
                                    for (const slot of property.availableSlots) {
                                        if (
                                            (d.isAfter(slot.startDate) || d.isSame(slot.startDate)) &&
                                            (d.isBefore(slot.endDate) || d.isSame(slot.endDate))
                                        ) {
                                            return false;
                                        }
                                    }

                                } else if (
                                    (pos === 'end') && dateFrom.isValid() && selectedSlot &&
                                    (d.isAfter(selectedSlot.startDate) || d.isSame(selectedSlot.startDate)) &&
                                    (d.isBefore(selectedSlot.endDate) || d.isSame(selectedSlot.endDate))
                                ) {
                                    return false;
                                }
                                return true;
                            }}
                            sx={{
                                width: '18rem',
                                height: 'max-content',
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small'
                                }
                            }}
                        />
                    </LocalizationProvider>
                </span>
                <span className="flex justify-start items-center gap-3">
                    <FontAwesomeIcon size="lg" icon={faUserGroup}/>
                    {`${searchContext.numPersons} ${searchContext.numPersons > 1 ? 'Επισκέπτες' : 'Επισκέπτης'}`}
                </span>
                <span className="flex justify-start items-center gap-3">
                    <FontAwesomeIcon size="lg" icon={faHandshake}/>
                    <span className="flex gap-1">
                    <b>{dailyCost * durationInDays}€</b>
                    {`(${dailyCost}€ / διανυκτέρευση)`}
                    </span>
                </span>
            </div>
            <PrimaryButton 
                classExtras="flex gap-3 items-center rounded-xl py-2 px-4 text-xl"
                onClick={makeReservation}
                disabled={!(
                    dateFrom.isValid() && dateTo.isValid() &&
                    dateFrom.isBefore(dateTo)
                )}
            >
                <FontAwesomeIcon icon={faCheck}/>
                Ολοκλήρωση Κράτησης
            </PrimaryButton>
        </div>
    );
}
