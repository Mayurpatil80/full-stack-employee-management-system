package com.emp.EMP.S.service.service.impl;

import com.emp.EMP.S.dto.EmployeeDto;
import com.emp.EMP.S.model.Employee;
import com.emp.EMP.S.repository.EmployeeRepository;
import com.emp.EMP.S.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = mapToEntity(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return mapToDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee does not exist with id: " + employeeId));
        return mapToDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee does not exist with id: " + employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        return mapToDto(employeeRepository.save(employee));
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee does not exist with id: " + employeeId));
        employeeRepository.delete(employee);
    }

    @Override
    public List<EmployeeDto> searchEmployees(String query) {
        return employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private EmployeeDto mapToDto(Employee employee){
        return new EmployeeDto(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail());
    }

    private Employee mapToEntity(EmployeeDto dto){
        return new Employee(dto.getId(), dto.getFirstName(), dto.getLastName(), dto.getEmail());
    }
}
