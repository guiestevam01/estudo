package domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class ContactPoint {
    private String zipcode;
    private String street;
    private String number;
    private String complement;
    private String name;
    private String phone;
}