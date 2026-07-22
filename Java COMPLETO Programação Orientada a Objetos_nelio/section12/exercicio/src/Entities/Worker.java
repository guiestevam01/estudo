package Entities;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

public class Worker {
    private String name;
    private WorkerLevel level;
    private Double baseSalary;
    private Departament departament;

    private final List<HourContract> contracts = new ArrayList<>();
    public double income(int year, int month){
        double sum = baseSalary;
        return contracts.stream().filter(contract -> pertenceAoPeriodo(contract, year, month)).mapToDouble(HourContract::totalValue).sum();
    }

    private static boolean pertenceAoPeriodo(
            HourContract contract,
            int year,
            int month
    ) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(contract.getDate());

        int contractYear = calendar.get(Calendar.YEAR);
        int contractMonth = calendar.get(Calendar.MONTH) + 1;

        return contractYear == year && contractMonth == month;
    }
    public void  addContract(HourContract contract){
        Objects.requireNonNull(contract, "Contrato é obrigatório");
        contracts.add(contract);
    }
    public boolean removeContract(HourContract contract){
        Objects.requireNonNull(contract, "Contrato é obrigatório");
        return contracts.remove(contract);
    }
    public List<HourContract> getContracts() {
        return List.copyOf(contracts);
    }

    public void setName(String name) {
        if(name == null || name.isEmpty()){
            throw new IllegalArgumentException("Nome não pode estar vazio ou nulo");
        }
        this.name = name;
    }

    public void setBaseSalary(Double baseSalary) {
        if(baseSalary <= 0){
            throw new IllegalArgumentException("Salário base nao pode ser menor ou igual a zero");
        }
        this.baseSalary = baseSalary;
    }

    public void setLevel(WorkerLevel level) {
        Objects.requireNonNull(level,"Nível é obrigatorio");
        this.level = level;
    }



    public Worker(String name, WorkerLevel level, Double baseSalary, Departament departament){
        setName(name);
        setLevel(level);
        setBaseSalary(baseSalary);
        this.departament = Objects.requireNonNull(departament, "Departamento deve existir");
    }

}
