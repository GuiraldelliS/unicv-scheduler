package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.Address;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.service.AddressService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

import java.util.UUID;

import static java.util.Objects.*;

@GraphQLService
public class AddressGraphQLService {
    private final AddressService addressService;

    public AddressGraphQLService(AddressService addressService) {
        this.addressService = addressService;
    }

    @GraphQLQuery
    public Address findAddressById(@GraphQLArgument(name = "addressId") UUID addressId){
        return addressService.findById(addressId);
    }

    @GraphQLQuery
    public Page<Address> findAllAddress(@GraphQLArgument(name = "search")String search,
                                        @GraphQLArgument(name = "street")String street,
                                        @GraphQLArgument(name = "neighborhood")String neighborhood,
                                        @GraphQLArgument(name = "houseNumber")String houseNumber,
                                        @GraphQLArgument(name = "city")String city,
                                        @GraphQLArgument(name = "zipCode")String zipCode,
                                        @GraphQLArgument(name = "addressLead")Boolean addressLead,
                                        @GraphQLArgument(name = "pageableDTO")PageableDTO pageableDTO){
        return addressService.findAll(search, street, neighborhood, houseNumber, city, zipCode, addressLead, pageableDTO);
    }

    @GraphQLMutation
    public Address createAddress(@GraphQLArgument(name = "address")Address address){
        if(nonNull(address.getId())){
            return addressService.update(address);
        }
        return addressService.create(address);
    }

    @GraphQLMutation
    public Address updateAddress(@GraphQLArgument(name = "address")Address address){
        return addressService.update(address);
    }

    @GraphQLMutation
    public Address deleteAddress(@GraphQLArgument(name = "address")Address address){
        return addressService.delete(address);
    }
}
