package br.com.blue.prova.config.security.cliente;


import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

public class CustomMethodSecurityExpressionRoot extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {
    private Object filterObject;
    private Object returnObject;
    private Object target;

    CustomMethodSecurityExpressionRoot(Authentication a) {
        super(a);
    }

    public Object getFilterObject() {
        return filterObject;
    }

    public void setFilterObject(Object filterObject) {
        this.filterObject = filterObject;
    }

    public Object getReturnObject() {
        return returnObject;
    }

    public void setReturnObject(Object returnObject) {
        this.returnObject = returnObject;
    }

    public Object getThis() {
        return target;
    }

    /**
     * Sets the "this" property for use in expressions. Typically this will be the "this"
     * property of the {@code JoinPoint} representing the method invocation which is being
     * protected.
     *
     * @param target the target object on which the method in is being invoked.
     */
    void setThis(Object target) {
        this.target = target;
    }
}