package com.emp.EMP.S.service.service.impl;

import com.emp.EMP.S.model.Admin;
import com.emp.EMP.S.repository.AdminRepository;
import com.emp.EMP.S.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public boolean validateAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        // Check if admin exists AND password matches
        return admin != null && admin.getPassword().equals(password);
    }
}
