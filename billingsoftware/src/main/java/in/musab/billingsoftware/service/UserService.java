package in.musab.billingsoftware.service;

import in.musab.billingsoftware.io.UserRequest;
import in.musab.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}
