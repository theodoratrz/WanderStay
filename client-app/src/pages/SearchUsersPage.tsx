import { useCallback, useState } from "react"
import { searchUsers } from "../api/fetchRoutines/adminAPI";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useSearchParams } from "react-router-dom";
import { UserSearchResultTile } from "../components/UserSearchResultTile";
import { EditableTextField } from "../components/EditableTextField";
import { PrimaryButton } from "../components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { PageTitleSpan } from "../components/PageTitleSpan";

const PAGE_SIZE = 4;
const USERNAME_PARAM_KEY = 'username';
const ISACTIVE_PARAM_KEY = 'isActive';
export function SearchUsersPage() {

    const [params, setParams] = useSearchParams();
    const usernamePatternParam = params.get(USERNAME_PARAM_KEY);
    const isActiveParam = params.get(ISACTIVE_PARAM_KEY);

    const [usernamePattern, setUsernamePattern] = useState<string|null>(
        usernamePatternParam !== 'null' ? usernamePatternParam : null
    );
    const [isActive, setIsActive] = useState<boolean|null>(
        (String(isActiveParam)) !== 'null' ? 
        (isActiveParam === 'true') : null
    )

    const fetchUserResults = useCallback(
        async (pageNum: number, pageSize: number) => {
            return searchUsers({
                paginationInfo: {
                    pageNum,
                    pageSize
                },
                searchCriteria: {
                    usernamePattern,
                    isActive
                }
            }).then(res => {
                return res.content
            })
        }, [usernamePatternParam, isActiveParam]
    );

    const updateSearchParams = () => {
        setParams({
            [USERNAME_PARAM_KEY]: String(usernamePattern),
            [ISACTIVE_PARAM_KEY]: String(isActive),
        })
    }

    return (
        <div className="flex flex-col items-stretch gap-4 w-5/12">
            <PageTitleSpan>Διαχείριση Χρηστών</PageTitleSpan>
            <div className="flex flex-row justify-evenly items-center">
                <div className="flex flex-col">
                    <EditableTextField
                        text={usernamePattern ?? undefined}
                        edit={true}
                        boxType="Αναζήτηση με Όνομα Χρήστη"
                        setText={e => setUsernamePattern(e === '' ? null : e)}
                    />
                    <div className="flex items-center justify-start">
                        <CheckboxWithLabel
                            label="Ενεργός"
                            isChecked={Boolean(isActive)}
                            setIsChecked={(isChecked) => setIsActive(isChecked ? true : null)}
                        />
                        <CheckboxWithLabel
                            label="Ανενεργός"
                            isChecked={isActive === null ? false : !isActive}
                            setIsChecked={(isChecked) => setIsActive(isChecked ? false : null)}
                        />
                    </div>
                </div>
                <div className="">
                    <PrimaryButton 
                        classExtras="rounded-xl py-1 px-3 text-lg"
                        onClick={updateSearchParams}
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-3"/>
                        Αναζήτηση
                    </PrimaryButton>
                </div>                
            </div>
            <PaginatedResultsWrapper
                pageSize={PAGE_SIZE}
                resultFetcher={fetchUserResults}
                resultRenderer={u => <UserSearchResultTile key={u.username} user={u}/>}
                idleTitleBuilder={n => `Βρέθηκαν ${n} χρήστες`}
                loadingTitle="Αναζήτηση Χρηστών"
            />
        </div>
    );
}