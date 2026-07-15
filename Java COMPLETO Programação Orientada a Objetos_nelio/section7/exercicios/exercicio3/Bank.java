package exercicios.exercicio3;

public class Bank {
    private int number;
    private String holder;
    private double balance;

    public Bank(int number, String holder, double balance){
        this.number = number;
        this.holder = holder;
        this.balance = balance;
    }

    public void setHolder(String holder){
        this.holder = holder;
    }
    public void deposit(double amount){
        balance += amount;
    }
    public void withdraw(double amount){
        if(balance < amount){
            System.out.println("Saldo insuficiente");
        } else{
            balance -= amount + 5.00;
        }
    }

    @Override
    public String toString() {
        return  "Account " + number + ", Holder: " + holder + ", Balance: $ "+ String.format("%.2f", balance);
    }
}