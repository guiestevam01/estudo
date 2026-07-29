package Entities;

import java.util.Date;
import java.util.Objects;

public class HourContract {
    private final Date date;
    private final double valuePerHour;
    private final int hours;

    public HourContract(double valuePerHour, int hours, String date){
        Objects.requireNonNull(date, "Data é obrigatória");
        this.date = new Date(date);
        this.valuePerHour = valuePerHour;
        this.hours = hours;
    }
    public Double totalValue(){
        return valuePerHour * hours;
    }

    public Date getDate() {
        return date;
    }

    public double getValuePerHour() {
        return valuePerHour;
    }

    public int getHours() {
        return hours;
    }
}
