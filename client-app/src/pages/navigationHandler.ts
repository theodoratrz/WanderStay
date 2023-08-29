import { RoleType } from "../api/entities/RoleType";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";

export function getLoginNavigationPath(userRoles: RoleType[]) {
    for (const role in ORDERED_BASE_ROLE_PATHS) {
        if (userRoles.includes(role as RoleType)) {
            return ORDERED_BASE_ROLE_PATHS[role as RoleType];
        }
    }
    return "/";
}
