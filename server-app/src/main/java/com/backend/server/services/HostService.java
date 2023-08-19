package com.backend.server.services;

import org.springframework.stereotype.Service;

import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.User;
import com.backend.server.repositories.HostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HostService {

    private final HostRepository hostRepository;
    private final AuthService authService;

    public Host getHostFromTokenOrElseThrow(String token) throws RuntimeException {

        User user = authService.getUserFromTokenOrElseThrow(token);
        return hostRepository.findByUser(user).orElseThrow(
            () -> new RuntimeException(
                    "The provided JWT is not associated with a Host."
                )
        );
    }
}