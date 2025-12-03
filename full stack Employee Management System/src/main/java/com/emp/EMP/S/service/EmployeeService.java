package com.emp.EMP.S.service;

import com.emp.EMP.S.dto.EmployeeDto;
import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
    void deleteEmployee(Long employeeId);
    List<EmployeeDto> searchEmployees(String query);
}
