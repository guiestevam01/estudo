package course.comGenerics;

import java.util.ArrayList;
import java.util.List;

public class GenericBags<T> {
    private List<T> tools;

    public List<T> getTools() {
        return tools;
    }

    public void setTools(List<T> tools) {
        this.tools = tools;
    }

    public GenericBags() {
        tools = new ArrayList<>();
    }
    public void addTools(T t){
        tools.add(t);
    }

    @Override
    public String toString() {
        return "GenericBags {" +
                "tools=" + tools +
                '}';
    }
}
